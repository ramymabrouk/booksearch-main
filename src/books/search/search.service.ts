import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';


@Injectable()
export class SearchService {
    private readonly logger = new Logger(SearchService.name);
    constructor(private readonly httpService: HttpService){}
  getHello(): string {
    return 'Hello World!';
  }

  async findBook(id) {


    
    const { data } = await firstValueFrom(
        this.httpService.get(`https://openlibrary.org/isbn/${id.id}.json`).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
      );
      return data;
  }
}