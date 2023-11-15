import { Controller , Get, Param} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('books/search')
export class SearchController {
    constructor(private readonly searchService: SearchService){}

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.searchService.findBook({id});
    }
}



