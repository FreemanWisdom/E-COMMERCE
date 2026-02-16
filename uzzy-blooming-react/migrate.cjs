const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
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
            // Next.js Link uses href, React Router uses to. Naive replace.
            content = content.replace(/<Link href=/g, '<Link to=');
        }

        // Replace Next.js Image
        if (content.includes("import Image from 'next/image'")) {
            content = content.replace("import Image from 'next/image'", "");
            content = content.replace(/<Image/g, '<img');
            content = content.replace(/<\/Image>/g, '');
        }

        // Replace useRouter
        if (content.includes("import { useRouter } from 'next/navigation'")) {
            content = content.replace("import { useRouter } from 'next/navigation'", "import { useNavigate, useLocation } from 'react-router-dom'");
            content = content.replace(/const router = useRouter\(\)/g, "const navigate = useNavigate(); const location = useLocation()");
            content = content.replace(/router.push\(/g, "navigate(");
            content = content.replace(/router.back\(/g, "navigate(-1");
        }

        // Replace usePathname
        if (content.includes("import { usePathname } from 'next/navigation'")) {
            content = content.replace("import { usePathname } from 'next/navigation'", "import { useLocation } from 'react-router-dom'");
            content = content.replace(/const pathname = usePathname\(\)/g, "const location = useLocation(); const pathname = location.pathname");
        }

        fs.writeFileSync(filePath, content);
        console.log(`Processed ${filePath}`);
    }
});
