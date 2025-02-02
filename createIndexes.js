import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

// **Eğer model zaten tanımlandıysa, tekrar oluşturma**
const CountryModel = mongoose.models.Country || mongoose.model("Country", new mongoose.Schema({
    isoCode: { type: String, unique: true, index: true },
    name: { type: String, index: true },
    latitude: Number,
    longitude: Number,
}));

const StateModel = mongoose.models.State || mongoose.model("State", new mongoose.Schema({
    isoCode: { type: String, index: true },
    name: { type: String, index: true },
    countryCode: { type: String, index: true }, // Ülke bazlı iller için indexleme
    latitude: Number,
    longitude: Number,
}));

const CityModel = mongoose.models.City || mongoose.model("City", new mongoose.Schema({
    name: { type: String, index: true },
    countryCode: { type: String, index: true }, // Ülke bazlı aramalar için indexleme
    stateCode: { type: String, index: true }, // İl bazlı aramalar için indexleme
    latitude: Number,
    longitude: Number,
}));

// **Birleşik Indexler** (Sorguları hızlandırmak için)
StateModel.schema.index({ countryCode: 1, name: 1 }); // Ülkeye bağlı iller için
CityModel.schema.index({ countryCode: 1, stateCode: 1, name: 1 }); // İl ve ilçeye bağlı aramalar için

const createIndexes = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB bağlantısı başarılı.");

        console.log("Indexleme işlemi başlatıldı...");

        await CountryModel.createIndexes();
        console.log("Ülke indexleri oluşturuldu.");

        await StateModel.createIndexes();
        console.log("İl indexleri oluşturuldu.");

        await CityModel.createIndexes();
        console.log("İlçe indexleri oluşturuldu.");

        console.log("Tüm indexler başarıyla oluşturuldu.");
    } catch (error) {
        console.error("Indexleme sırasında hata oluştu:", error);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB bağlantısı kapatıldı.");
    }
}

export { createIndexes };