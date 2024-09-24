<img src="https://raw.githubusercontent.com/nursandiid/pdf-tools/main/public/img/preview.png">

## Overview
This PDF tools app offers an all-in-one solution for managing PDF files. Easily merge, split, and convert PDFs with just a few clicks. It supports JPG to PDF conversion, PDF page orientation adjustments, and file size reduction while maintaining quality. The app features a sleek UI design using Tailwind CSS, drag-and-drop uploads, and real-time file management with Zustand. Users can also view PDFs in real-time, generate thumbnails, and track all file activities—all within an intuitive and streamlined interface.

## Features:
- 📑 Combine multiple PDFs into one easily
- ✂️ Break large PDFs into smaller files
- 🖼️ Convert PDF pages to high-quality JPG images
- 📷 Convert JPG images to PDF format
- 🔄 Adjust the orientation of PDF pages
- 📉 Reduce PDF file size while keeping quality
- 📄 Convert Word and PowerPoint files to PDF
- ✨ Sleek and intuitive UI design using Tailwind CSS
- 📂 Easy file uploads with drag-and-drop
- 🗂️ Efficiently manage files using Zustand
- 🔍 View PDFs and other files in real-time
- 🖼️ Generate quick visual thumbnails of PDFs
- 📥 Seamlessly track file uploads
- ⚡ Real-time PDF tasks with Laravel Reverb and Jobs
- 🚨 Alerts for errors and statuses using toastr
- ⬇️ Easy access to download processed files
- 📊 Central hub to track all file activities and processes

## Installation
For the installation you can clone this project to your local computer.
```bash
git clone https://github.com/nursandiid/pdf-tools
```

Navigate to the project folder.
```bash
cd pdf-tools
```

Install required packages.
```bash
composer install
npm install
```

Create a new .env file and edit the database credentials.
```bash
cp .env.example .env
```

## Configuration

### Application Settings
```bash
APP_NAME="Yoo PDF"
APP_TIMEZONE="Asia/Jakarta"
APP_URL="http://127.0.0.1:8000"
```

### Database Connection
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=w2_pdf_tools
DB_USERNAME=root
DB_PASSWORD=
```

### Filesystem Configuration
```bash
FILESYSTEM_DISK=public
```

### Queue Connection
In this case, you can set the value to `database`.

```bash
QUEUE_CONNECTION=database
```

### Laravel Reverb Connection
Run this command to generate our credentials:
```bash
php artisan reverb:install
```

It will automatically fill these variables:
```bash
BROADCAST_CONNECTION=reverb

REVERB_APP_ID=198038
REVERB_APP_KEY=obxrp97kzubmkwopetvi
REVERB_APP_SECRET=pp2ataxxaqncsg5p15ey
REVERB_HOST="localhost"
REVERB_PORT=8080
REVERB_SCHEME=http

VITE_REVERB_APP_KEY="${REVERB_APP_KEY}"
VITE_REVERB_HOST="${REVERB_HOST}"
VITE_REVERB_PORT="${REVERB_PORT}"
VITE_REVERB_SCHEME="${REVERB_SCHEME}"
```

Add this line, as we are using it on the client:
```bash
VITE_APP_NAME="${APP_NAME}"
```

### Ilove API Connection
Since we utilize some advanced services that can’t be managed with PHP alone, I’ve opted to use the iLovePDF API as an alternative. 
Obtain your credentials from the dashboard and enter them here:

```bash
ILOVEPDF_PUBLIC_KEY=""
ILOVEPDF_SECRET_KEY=""
```

## Run Commands
Generate new app key:
```bash
php artisan key:generate
```

Run migrations:
```bash
php artisan migrate
```

Run seeders:
```bash
php artisan db:seed
```

Generate a symlink to view files in storage:
```bash
php artisan storage:link
```

Start the web socket server:
```bash
php artisan reverb:start
```

Run the queue in development mode:
```bash
php artisan queue:listen
```

If you're using cron jobs, add this command to your crontab:
```bash
* * * * * cd /path-to-your-project && php artisan queue:listen >> /dev/null 2>&1
```

Build assets with NPM:
```bash
npm run build
```

Alternatively, run in development mode:
```bash
npm run dev
```

Run your app:
```bash
php artisan serve
```

That's it! Launch the main URL at http://127.0.0.1:8000