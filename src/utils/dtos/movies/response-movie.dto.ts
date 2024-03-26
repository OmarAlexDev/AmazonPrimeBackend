import {Expose, Transform, Type} from 'class-transformer'

export class ResponseMovieDto{
    @Expose()
    id: number

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    duration: string;

    @Expose()
    year: number;

    @Expose()
    ageLimit: number;

    @Expose()
    @Transform(({value})=>{
        return value ? value.split(',') : []
    })
    categories: string[] | null;

    @Expose()
    studio: string;
    
    @Expose()
    imdb: number;

    @Expose()
    @Transform(({obj})=>{
        return { 
            languages: obj.languages.split(','),
            subtitles: obj.subtitles.split(','),
            directors: obj.directors ? obj.directors.split(',') : [],
            producers: obj.producers ? obj.producers.split(',') : [],
            starring: obj.starring ? obj.starring.split(',') : []
        };
    })
    info: {
        languages: string[] | null;
        subtitles: string[] | null;
        directors: string[] | null;
        producers: string[] | null;
        starring: string[] | null;
    }

}

