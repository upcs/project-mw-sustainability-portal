const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const rateLimit = require('express-rate-limit');
const dbms = require("./dbms");
const sanitizer = require('sanitize-filename');

const router = express.Router();

/* ---------------- AUTH ---------------- */
function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    console.log("not logged in");
    return res.redirect('/login_page');
}

/* ---------------- FILE SETUP ---------------- */
const upImgDir = path.join(process.cwd(), "public", "images");

fs.mkdir(upImgDir, { recursive: true }).catch(console.error);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, upImgDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

/* ---------------- RATE LIMIT ---------------- */
const upload_limit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 40,
});

/* ---------------- PROMISIFIED DB ---------------- */
function dbQueryAsync(sql) {
    return new Promise((resolve, reject) => {
        dbms.dbquery(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

/* ---------------- ROUTE ---------------- */
router.post(
    '/',
    upload_limit,
    ensureAuthenticated,
    upload.single("uploadFile"),
    async (req, res) => {
        try {
            /* -------- INPUT -------- */
            const name = sanitizer(req.body.name || "");
            const team = req.body.team || "";
            const descript = req.body.description || "";

            if (!name || !team || !descript) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const img = req.file ? req.file.filename : null;

            console.log("New project:", name, team, img);

            /* -------- FILE SYSTEM -------- */
            const uploadDirFull = path.join("public", "assets", name);
            await fs.mkdir(uploadDirFull, { recursive: true });

            const descriptPathFull = path.join(uploadDirFull, "description.txt");
            await fs.writeFile(descriptPathFull, descript, "utf8");

            /* -------- PATHS FOR DB -------- */
            const filePath = img
                ? path.posix.join("/images", img)
                : null;

            const assetPath = `assets/${name}/description.txt`;

            /* -------- SQL (still string-based for now) -------- */
            const sql = `
                INSERT INTO projects_list (name, team, image_route)
                VALUES ('${name}', '${team}', '${filePath}');

                INSERT INTO project_assets (project_id, asset_route, is_text)
                SELECT id, '${assetPath}', 1
                FROM projects_list
                WHERE name = '${name}';
            `;

            await dbQueryAsync(sql);

            /* -------- RESPONSE (ONLY ONE) -------- */
            const projectUrl = `/projects/${name}`;

            const isFetch =
            req.xhr ||
            (req.headers.accept && req.headers.accept.includes("application/json"));

            if (isFetch) {
                return res.status(201).json({
                    action: "clear",
                    message: "Project uploaded successfully!"
                });

                // return res.status(201).json({
                //     action: "redirect",
                //     url: projectUrl
                // });
            }

            return res.redirect(projectUrl);

        } catch (err) {
            console.error("Upload failed:", err);
            return res.status(500).json({ message: "Upload failed" });
        }
    }
);

module.exports = router;