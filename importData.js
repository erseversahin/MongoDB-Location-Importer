import mongoose from "mongoose";
import { Country, State, City } from "country-state-city";
import { MONGO_URI } from "./config.js";


// MongoDB Modellerini Tanımla
const countrySchema = new mongoose.Schema({
    isoCode: String,
    name: String,
    latitude: Number,
    longitude: Number,
});

const stateSchema = new mongoose.Schema({
    isoCode: String,
    name: String,
    countryCode: String,
    latitude: Number,
    longitude: Number,
});

const citySchema = new mongoose.Schema({
    name: String,
    countryCode: String,
    stateCode: String,
    latitude: Number,
    longitude: Number,
});

const CountryModel = mongoose.model("Country", countrySchema);
const StateModel = mongoose.model("State", stateSchema);
const CityModel = mongoose.model("City", citySchema);

// MongoDB'ye Bağlan ve Verileri Ekle
const importData = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB bağlantısı başarılı.");

        // Ülkeleri Kaydet
        console.log("Ülkeler ekleniyor...");
        const countries = Country.getAllCountries().map(country => ({
            isoCode: country.isoCode,
            name: country.name,
            latitude: parseFloat(country.latitude) || null,
            longitude: parseFloat(country.longitude) || null,
        }));
        await CountryModel.insertMany(countries);
        console.log("Ülkeler eklendi. TOPLAM:", (await CountryModel.countDocuments()));

        // Eyaletleri Kaydet
        console.log("Eyaletler ekleniyor...");
        for (let country of countries) {
            const states = State.getStatesOfCountry(country.isoCode).map(state => ({
                isoCode: state.isoCode,
                name: state.name,
                countryCode: state.countryCode,
                latitude: parseFloat(state.latitude) || null,
                longitude: parseFloat(state.longitude) || null,
            }));
            if (states.length > 0) {
                await StateModel.insertMany(states);
            }
        }
        console.log("Eyaletler eklendi. TOPLAM:", (await StateModel.countDocuments()));

        // Şehirleri Kaydet
        console.log("Şehirler ekleniyor...");
        for (let country of countries) {
            const states = await StateModel.find({ countryCode: country.isoCode });
            for (let state of states) {
                const cities = City.getCitiesOfState(country.isoCode, state.isoCode).map(city => ({
                    name: city.name,
                    countryCode: city.countryCode,
                    stateCode: city.stateCode,
                    latitude: parseFloat(city.latitude) || null,
                    longitude: parseFloat(city.longitude) || null,
                }));
                if (cities.length > 0) {
                    await CityModel.insertMany(cities);
                }
            }
        }
        console.log("Şehirler eklendi. TOPLAM:", (await CityModel.countDocuments()));

        console.log("Tüm veriler başarıyla MongoDB'ye kaydedildi.");
    } catch (error) {
        console.error("Hata oluştu:", error);
    }
}

export { importData };