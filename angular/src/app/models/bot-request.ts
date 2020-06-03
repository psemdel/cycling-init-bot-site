export class BotRequest {
    id: number;
    author: number;
    author_name: string;
    entry_time: Date;
    process_start_time: Date;
    process_end_time: Date;
    status: string;
    routine: string;
    item_id: string;
    request_text: string;
    //to be brought to CreateRiderRequest
    nationality: string; 
    name: string;
    gender: string;
    //classification import
    classificationtype: number;
}

