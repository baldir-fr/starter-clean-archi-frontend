import { BookmarkRepository } from '../../repositories/BookmarkRepository'
import { GetBookmarkCityPresentation } from './GetBookmarkCityPresentation'

export class GetBookmarkCityUseCase {
    constructor(private readonly repository: BookmarkRepository) {

    }

    execute(presentation: GetBookmarkCityPresentation) {
        this.repository.getBookmarkCity()
            .then(cityBookmarked => {
                if (cityBookmarked) {
                    presentation.notifyCityBookmarked(cityBookmarked)
                }
            })
    }
}
