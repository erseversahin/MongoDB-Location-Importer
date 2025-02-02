# 🌍 MongoDB Location Importer

Bu proje, **MongoDB** ile **ülke, eyalet ve şehir** verilerini saklamanızı ve yönetmenizi sağlar. 🚀  
`country-state-city` NPM paketi kullanılarak **ülke > il > ilçe** hiyerarşisinde veriler çekilir ve optimize edilmiş şekilde MongoDB'ye kaydedilir.  
Ayrıca, **hızlı sorgular için indexleme yapılır.**

## 📌 Özellikler
✅ **Ülke, Eyalet ve Şehir Verisi** – `country-state-city` paketi kullanılarak çekilir.  
✅ **MongoDB'ye Kaydetme** – `mongoose` ile veriler MongoDB'ye eklenir.  
✅ **Hızlı Arama İçin Indexleme** – Ülke, eyalet ve şehir sorguları optimize edilir.  
✅ **ES Module Desteği** – Modern `import/export` yapısı ile geliştirilmiştir.  

---

## 🚀 Kurulum ve Çalıştırma
### 1️⃣ **Depoyu Klonla**
```sh
git clone https://github.com/kullanici/mongodb-location.git
cd mongodb-location
```

### 2️⃣ **Bağımlılıkları Kur**
```sh
npm install
```

### 3️⃣ **MongoDB Bağlantısını Yapılandır (`config.js`)**
MongoDB bağlantı adresini güncelle:
```js
export const MONGO_URI = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority";
```

### 4️⃣ **Verileri İçeri Aktar**
```sh
npm run import
```

### 5️⃣ **Indexleme İşlemini Çalıştır**
```sh
npm run index
```

### 6️⃣ **Tüm İşlemleri Tek Seferde Çalıştır**
```sh
npm run start
```

---

## 📂 Proje Yapısı
```plaintext
mongodb-location/
│── config.js            # MongoDB bağlantı bilgileri
│── importData.js        # Ülke, eyalet ve şehir verilerini MongoDB'ye kaydeder
│── createIndexes.js     # Hızlı sorgular için indexleme yapar
│── index.js             # Ana dosya, tüm işlemleri başlatır
│── package.json         # Bağımlılıkları içerir
└── README.md            # Bu dosya 😊
```

---

## 🛠 Kullanılan Teknolojiler
- **Node.js** – Backend geliştirme
- **MongoDB & Mongoose** – NoSQL veritabanı ve ODM
- **country-state-city** – Ülke, eyalet ve şehir verisi
- **ES Modules** – Modern `import/export` yapısı

---

## 🤖 API Kullanımı (Opsiyonel)
Eğer bu verileri bir REST API ile kullanmak istiyorsanız, **Express.js** gibi bir framework ile aşağıdaki gibi kullanabilirsiniz:

```js
import express from "express";
import { CountryModel, StateModel, CityModel } from "./models.js";

const app = express();
app.get("/countries", async (req, res) => {
    const countries = await CountryModel.find();
    res.json(countries);
});

app.get("/states/:countryCode", async (req, res) => {
    const states = await StateModel.find({ countryCode: req.params.countryCode });
    res.json(states);
});

app.get("/cities/:countryCode/:stateCode", async (req, res) => {
    const cities = await CityModel.find({
        countryCode: req.params.countryCode,
        stateCode: req.params.stateCode,
    });
    res.json(cities);
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

## 🎯 Yapılacaklar
- [ ] **GraphQL Desteği**  
- [ ] **API Dokümantasyonu**  
- [ ] **Daha Detaylı Veri Analizi**  

---

## 📢 Katkıda Bulunma
Projeye katkıda bulunmak için **Pull Request (PR)** gönderebilir veya **Issue** açabilirsin.  

Eğer projeyi beğendiysen ⭐ vermeyi unutma! 😍  
Happy coding! 🚀🔥
