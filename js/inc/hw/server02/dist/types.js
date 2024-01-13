"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["Ok_200"] = 200] = "Ok_200";
    Status[Status["Created_201"] = 201] = "Created_201";
    Status[Status["NoContent_204"] = 204] = "NoContent_204";
    Status[Status["BadRequest_400"] = 400] = "BadRequest_400";
    Status[Status["Unauthorized_401"] = 401] = "Unauthorized_401";
    Status[Status["NotFound_404"] = 404] = "NotFound_404";
})(Status || (exports.Status = Status = {}));
