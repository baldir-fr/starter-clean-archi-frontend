# Starter for clean architecture

This is just a minimalistic starter. 
For a more complete example please check out the repository from which this one was forked.
- https://github.com/Zenika/grenoble-hands-on-front-clean-architecture

## Prerequisite

- nodejs > 10

## Install

```
npm install
```

## Usage

### Angular

```
npm run angular 
```

### React

```
npm run react
```

## Structure

![clean-archi](./doc/clean-archi.png)

* **packages/domain** : Core of business application (city, weather, port)
* **packages/web/adapters** : Class used to make infrastructure communicate with domaine 
* **packages/web/infrastructure** : Weather app with frameworks usage 

## Technologies

### Langage

* Typescript

### Tools / Libraries

* Lerna
* Angular
* React
* Jest
* @testing/library
