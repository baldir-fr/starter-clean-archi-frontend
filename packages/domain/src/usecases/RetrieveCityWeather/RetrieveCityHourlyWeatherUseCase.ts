import {RetrieveWeatherRequest} from './RetrieveWeatherRequest'
import {WeatherRepository} from '../../repositories/WeatherRepository'
import {HourlyWeather} from '../../entities/HourlyWeather'
import {RetrieveHourlyWeatherPresentation} from './RetrieveHourlyWeatherPresentation'

export class RetrieveCityHourlyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {

    }

    async execute(request: RetrieveWeatherRequest, presenter: RetrieveHourlyWeatherPresentation) {
        presenter.displayLoadingWeather()
        const weekWeather = await this.weatherRepository.getCityHourlyWeather(request.city).then((weather: HourlyWeather[]) => {
            if (request.unite == 'F') {
                return weather.map(w => {
                    w.unite = 'F'
                    w.temperature = Math.round(w.temperature * (9 / 5) + 32)
                    return w
                })
            } else {
                return weather
            }
        });
        presenter.displayHourlyWeather(weekWeather)
    }
}
