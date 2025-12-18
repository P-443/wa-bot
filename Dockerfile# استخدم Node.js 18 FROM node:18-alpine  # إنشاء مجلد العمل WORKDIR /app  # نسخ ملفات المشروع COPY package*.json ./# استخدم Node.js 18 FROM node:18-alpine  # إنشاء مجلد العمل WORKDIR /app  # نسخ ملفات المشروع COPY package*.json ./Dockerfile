# استخدم Node.js 18
FROM node:18-alpine

# إنشاء مجلد العمل
WORKDIR /app

# نسخ ملفات المشروع
COPY package*.json ./
RUN npm install

COPY . .

# بناء Tailwind CSS
RUN npm run build

# تعيين المنفذ
EXPOSE 3000

# تشغيل التطبيق
CMD ["npm", "run", "dev"]
