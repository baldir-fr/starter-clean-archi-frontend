import { BookmarkRepository } from '../../repositories/BookmarkRepository'
import { BookmarkCityRequest } from './BookmarkCityRequest'
import { BookmarkCityPresentation } from './BookmarkCityPresentation'

export class BookmarkCityUseCase {
    constructor(private readonly repository: BookmarkRepository) {

    }

    execute(request: BookmarkCityRequest, presentation: BookmarkCityPresentation) {
        this.repository.bookmarkCity(request.city)
            .then(cityHasBeenBookmarked => {
                if (cityHasBeenBookmarked) {
                    presentation.notifyCityBookmarked(request.city)
                } else {
                    presentation.notifyCityRemovedFromBookmark()
                }
            })
    }
}
