import { HttpContextToken } from "@angular/common/http";

export const skipUrlModification = new HttpContextToken(() => false);