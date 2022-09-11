import axios from "axios";
import { IDailyForecasts, IMainWeather, ISearchResult } from '@/interfaces/weather-data.interface';


export class WeatherAPIService {

    private apiKey: string = 'eokdHD39sJEVmIcVIjDBQkoO9Nu42fx9';
    private defaultUrl: string = 'http://dataservice.accuweather.com'
    
    async getAutoComplete(text: string) {
        const url = this.defaultUrl + `/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${text}`
        const res = await axios.get(url)
        const cities: ISearchResult[] = res.data;
        console.log("🚀 ~ file: weather.api.service.ts ~ line 14 ~ WeatherAPIService ~ getAutoComplete ~ cities", cities)
        return cities
    }
    
    async getCurrentConditions(key: string) {
        console.log("🚀 ~ file: weather.api.service.ts ~ line 8 ~ WeatherAPIService ~ apiKey", process.env)
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


