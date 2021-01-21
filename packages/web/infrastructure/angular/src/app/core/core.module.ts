import {InjectionToken, NgModule} from '@angular/core';
import {HttpClient as AngularHttpClient} from '@angular/common/http';
import {
  AddCityPresenterFactory,
  CitiesPresenterFactory,
  CityPresenterFactory,
  CityRepositoryInMemory,
  Navigation,
  HttpClient,
  WeatherRepositoryHttp, NavigationRoute
} from '@grenoble-hands-on/web-adapters';
import {
  AddCityUseCase,
  CityRepository,
  GetCitiesUseCase,
  GetCityUseCase,
  RetrieveCityWeatherUseCase,
  WeatherRepository
} from '@grenoble-hands-on/domain';
import {Router} from '@angular/router';

export const IHttpClient = new InjectionToken<HttpClient>('HttpClient');
export const INavigation = new InjectionToken<Navigation>('Navigation');
export const ICityRepository = new InjectionToken<CityRepository>('CityRepository');
export const IWeatherRepository = new InjectionToken<WeatherRepository>('WeatherRepository');

@NgModule({
  imports: [],
  exports: [],
  providers: [
    {
      provide: IHttpClient,
      useFactory: (httpClient: AngularHttpClient): HttpClient => ({
        get<T>(url: string): Promise<T> {
          return httpClient.get<T>(url).toPromise();
        }
      }),
      deps: [AngularHttpClient]
    },
    {
      provide: INavigation,
      useFactory: (router: Router): Navigation => ({
        navigate(route: NavigationRoute): Promise<void> {
          return router.navigateByUrl(route.toString()).then(() => Promise.resolve());
        }
      }),
      deps: [Router]
    },
    {
      provide: ICityRepository,
      useValue: new CityRepositoryInMemory()
    },
    {
      provide: IWeatherRepository,
      useFactory: (httpClient: HttpClient) => new WeatherRepositoryHttp(httpClient),
      deps: [IHttpClient]
    },
    {
      provide: GetCitiesUseCase,
      useFactory: (cityRepository: CityRepository) => new GetCitiesUseCase(cityRepository),
      deps: [ICityRepository]
    },
    {
      provide: GetCityUseCase,
      useFactory: (cityRepository: CityRepository) => new GetCityUseCase(cityRepository),
      deps: [ICityRepository]
    },
    {
      provide: AddCityUseCase,
      useFactory: (cityRepository: CityRepository) => new AddCityUseCase(cityRepository),
      deps: [ICityRepository]
    },
    {
      provide: RetrieveCityWeatherUseCase,
      useFactory: (weatherRepository: WeatherRepository) => new RetrieveCityWeatherUseCase(weatherRepository),
      deps: [IWeatherRepository]
    },
    {
      provide: CityPresenterFactory,
      useFactory: (getCityUseCase: GetCityUseCase, retrieveCityWeatherUseCase: RetrieveCityWeatherUseCase) => (
        new CityPresenterFactory(getCityUseCase, retrieveCityWeatherUseCase)
      ),
      deps: [GetCityUseCase, RetrieveCityWeatherUseCase]
    },
    {
      provide: CitiesPresenterFactory,
      useFactory: (getCitiesUseCase: GetCitiesUseCase) => new CitiesPresenterFactory(getCitiesUseCase),
      deps: [GetCitiesUseCase]
    },
    {
      provide: AddCityPresenterFactory,
      useFactory: (addNewCityUseCase: AddCityUseCase, navigation: Navigation) => new AddCityPresenterFactory(addNewCityUseCase, navigation),
      deps: [AddCityUseCase, INavigation]
    },
  ]
})
export class CoreModule {
}
