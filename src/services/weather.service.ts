import { IFullCityData, ISearchResult } from '@/interfaces/weather-data.interface';
import { WeatherAPIService } from './weather.api.service';
import moment from 'moment';


export class WeatherService {
    private weatherApiService: WeatherAPIService;
    defaultCity: ISearchResult = {
        Key:'215854', 
        Type:'City', 
        LocalizedName:'Tel Aviv',
        Country: {
           ID: 'IL',
           LocalizedName: 'Israel'
        }
    }
    
   
    constructor() {
     this.weatherApiService = new WeatherAPIService()   
    }

    async searchForCities(txt:string) {
        return await this.weatherApiService.getAutoComplete(txt)
    }

    async getDefaultCard() {
        let card = this.loadSavedCard()
        if (!card) {
            const currWeather = await this.weatherApiService.getCurrentConditions(this.defaultCity.Key)
            const dailyForecsts = await this.weatherApiService.getDailyForecasts(this.defaultCity.Key)
            card = {locationData: this.defaultCity, mainWeather: currWeather, dailyForecasts: dailyForecsts}
            this._saveToLocalStorage('defaultCard',card)
        }
        return card;
    }

    async getCard(locationData:ISearchResult) {
        const currWeather = await this.weatherApiService.getCurrentConditions(locationData.Key)
        const dailyForecsts = await this.weatherApiService.getDailyForecasts(locationData.Key)
        const card = {locationData: locationData, mainWeather: currWeather, dailyForecasts: dailyForecsts}
        this._saveToLocalStorage('currCard',card)
        return card;
    }
    


    loadSavedCard() {
        const storageCard = localStorage.getItem('defaultCard')
        if (storageCard) {
            let defaultCard: IFullCityData | null = JSON.parse(storageCard)
            if (!defaultCard) return ;
            const diffDays = this.isSameDay(defaultCard.mainWeather.LocalObservationDateTime)
            if (!diffDays) {
                return;
            }
            return defaultCard;
        }

    }

    isSameDay(cardDate: string | Date) {
      const momentCardDate = moment(cardDate)
      const momentToday = moment()
      return momentCardDate.isSame(momentToday, 'date')
    }


    _saveToLocalStorage(keyname: string ,card: object) {
        localStorage.setItem(keyname, JSON.stringify(card))
    }
}

