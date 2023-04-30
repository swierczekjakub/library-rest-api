# library-rest-api<!-- Spis treści -->
# :notebook_with_decorative_cover: Spis treści

- [Zastosowane technologie](#space_invader-zastosowane-technologie)
- [Konfiguracja projektu](#key-konfiguracja-projektu)
- [Uruchomienie projektu](#toolbox-uruchomienie-projektu)
  * [Instalacja](#gear-instalacja)
  * [Uruchomienie lokalne](#running-uruchomienie-lokalne)

<!-- Zastosowane technologie -->
## :space_invader: Zastosowane technologie

  <p><a href="https://www.typescriptlang.org/">Typescript</a></p>
  <p><a href="https://www.mysql.com/">MySQL</a></p>
  <p><a href="https://expressjs.com/">Express.js</a></p>

<!-- Konfiguracja projektu -->
## :key: Konfiguracja projektu

W celu prawidłowego skonfigurowania projektu i połączenia z bazą danych należy utworzyć plik `.env` w głównym folderze projektu i odpowiednio go wypełnić w oparciu o opcje zawarte w pliku `data-source.ts`.

<!-- Uruchomienie projektu -->
## 	:toolbox: Uruchomienie projektu

W tym projekcie domyślnym menadżerem paczek jest NPM. Po stworzeniu bazy danych istnieje możliwość automatycznego stworzenia tabel za pomocą uruchomienia migracji lub zmiany opcji `synchronize: false` na `synchronize: true`. 
Podczas pomyślnego uruchomienia lokalnego po przejsciu na adres http://localhost:3000 znajduje sie odnośnik z podpiętym swaggerem z listą endpointów aplikacji.

<h3><b> Jako pierwsze zalecam uruchomienie migracji za pomoca npm run migrate:run, ponieważ stworzone tabele od razu zostaną wypełnione przykładowymi danymi na których bezpośrednio można testować aplikacje.</b></h3>

<!-- Instalacja -->
### :gear: Instalacja

W katalogu projektu zainstaluj niezbędne zależności i paczki za pomocą komendy:

```bash
  npm install
```
<!-- Uruchomienie lokalne -->
## :running: Uruchomienie lokalne

Uruchomienie serwera

```bash
  npm start
```

Uruchomienie serwera ze śledzeniem zmian

```bash
  npm run start:dev
```

Zbudowanie wersji produkcyjnej aplikacji

```bash
  npm run build
```
Uruchomienie wszystkich migracji tworzących strukture tabel i wypełnia je przykładowymi danymi

```bash
npm run migrate:run
```

