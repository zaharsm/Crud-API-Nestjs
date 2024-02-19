import { PartialType } from "@nestjs/swagger";
import { CreateMagazineDto } from "./create.magazine.request.dto";

export class UpdateMagazineRequestDto extends PartialType(CreateMagazineDto){};
