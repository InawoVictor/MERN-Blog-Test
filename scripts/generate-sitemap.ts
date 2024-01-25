const sitemap = require("nextjs-sitemap-generator")
const path = require("path")

sitemap({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    pagesDirectory: path.resolve(__dirname, "../pages"),
    targetDirectory: path.resolve(__dirname, "../pages"),
    ignoredExtensions: ["ts", "map", "json", "xml", "png", "css", "jpeg", "jpg", "icons"],
    ignoredPaths: [
        "404",
        "favicon",
        "index"
    ],
    extraPaths: [
        "/"
    ]
})