const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDir = './src';

walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace 'use client'
        content = content.replace(/'use client';/g, '');
        content = content.replace(/"use client";/g, '');

        // Replace Next.js Link
        if (content.includes("import Link from 'next/link'")) {
            content = content.replace("import Link from 'next/link'", "import { Link } from 'react-router-dom'");
        }

        // Replace Next.js Image
        // This is a naive replacement, manual check might be needed for complex Image props
        if (content.includes("import Image from 'next/image'")) {
            content = content.replace("import Image from 'next/image'", "");
            // Replace <Image ... /> with <img ... />
            // Regex to match <Image ... /> tag
            // This is complicated with regex, better to just change the import and letting the dev fix the tag or use a simple substitution
            // For now, let's replace the tag name. Props like `fill`, `priority` will warn but might work if ignored or handled by browser
            content = content.replace(/<Image/g, '<img');
            content = content.replace(/<\/Image>/g, '');
            // Remove width/height if fill was used? No, easier to leave them.
        }

        // Replace useRouter from next/navigation
        if (content.includes("import { useRouter } from 'next/navigation'")) {
            content = content.replace("import { useRouter } from 'next/navigation'", "import { useNavigate, useLocation } from 'react-router-dom'");
            content = content.replace(/const router = useRouter\(\)/g, "const navigate = useNavigate(); const location = useLocation()");
            content = content.replace(/router.push\(/g, "navigate(");
            content = content.replace(/router.back\(/g, "navigate(-1");
            content = content.replace(/pathname/g, "location.pathname");
        }

        // Replace usePathname from next/navigation
        if (content.includes("import { usePathname } from 'next/navigation'")) {
            content = content.replace("import { usePathname } from 'next/navigation'", "import { useLocation } from 'react-router-dom'");
            content = content.replace(/const pathname = usePathname\(\)/g, "const location = useLocation(); const pathname = location.pathname");
        }

        fs.writeFileSync(filePath, content);
        console.log(`Processed ${filePath}`);
    }
});
