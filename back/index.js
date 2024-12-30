const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const prisma = new PrismaClient();

const cors_options = {
    origin: "http://127.0.0.1:5500", // Use your frontend's URL here
};

// Multer configuration
const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage });

const uploading_mid = async (req, res, next) => {
    upload.single("file")(req, res, async (err) => {
        if (err) {
            return res.status(400).send("File upload failed");
        }
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        try {
            const form_data = new FormData();
            form_data.append("file", req.file.buffer, req.file.originalname);

            // Send the file to SeaweedFS
            const response = await axios.post(
                "http://localhost:9333/submit",
                form_data,
                {
                    headers: {
                        ...form_data.getHeaders(),
                    },
                }
            );

            const fid = response.data.fid;
            req.fid = fid; // Attach the fid to the request object
            console.log(fid);

            next();
        } catch (err) {
            console.error(err);
            res.status(500).send("Error uploading file to SeaweedFS");
        }
    });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(cors_options));

app.post("/data", uploading_mid, async (req, res) => {
    try {
        const user_created = await prisma.user.create({
            data: {
                username: req.body.username,
                file: req.fid, // Save the SeaweedFS file ID (fid)
            },
        });
        res.status(200).send("File uploaded successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

app.listen(4000, () => {
    console.log("server listening on port 4000");
});
