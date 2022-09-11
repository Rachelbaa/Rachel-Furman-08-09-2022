import axios from "axios";
import { IDailyForecasts, IMainWeather, ISearchResult } from '@/interfaces/weather-data.interface';


export class WeatherAPIService {

    private apiKey: string = 'wqE3V5s4Zvv4efuLLuyfFbGJvfXJm3p4';
    private defaultUrl: string = 'https://dataservice.accuweather.com'
    constructor() {
        console.log("🚀 ~ file: weather.api.service.ts ~ line 9 ~ WeatherAPIService ~ defaultUrl", this.defaultUrl)
    }
    async getAutoComplete(text: string) {
        const url = this.defaultUrl + `/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${text}`
        const res = await axios.get(url)
        const cities: ISearchResult[] = res.data;
        return cities
    }
    
    async getCurrentConditions(key: string) {
        const url = this.defaultUrl + `/currentconditions/v1/${key}?apikey=${this.apiKey}`
        const res = await axios.get(url)
        const currWeather: IMainWeather = res.data[0];
        return currWeather;
    }

    async getDailyForecasts(key: string) {
        const url = this.defaultUrl + `/forecasts/v1/daily/5day/${key}?apikey=${this.apiKey}`
        const res = await axios.get(url)
        const dailyForecsts: IDailyForecasts[] = res.data.DailyForecasts;
        return dailyForecsts;
    }




}


