import request from "supertest";
import { setupApp } from "../../../src/setup-app";
import express from "express";
import { VehicleFeature } from "../../../src/drivers/types/driver";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { DriverInputDto } from "../../../src/drivers/dto/driver.input-dto";
import { DRIVERS_PATH, TESTING_PATH } from "../../../src/core/paths/paths";

describe("Driver API body validation check", () => {
  const app = express();
  setupApp(app);

  const correctTestDriverData: DriverInputDto = {
    name: "Valentin",
    phoneNumber: "123-456-7890",
    email: "valentin@example.com",
    vehicleMake: "BMW",
    vehicleModel: "X5",
    vehicleYear: 2021,
    vehicleLicensePlate: "ABC-123",
    vehicleDescription: "Some description",
    vehicleFeatures: [VehicleFeature.ChildSeat],
  };

  beforeAll(async () => {
    await request(app)
      .delete(`${TESTING_PATH}/all-data`)
      .expect(HttpStatus.NoContent);
  });

  it(`should not create driver when incorrect body passed; POST /api/drivers'`, async () => {
    const invalidDataSet1 = await request(app)
      .post(DRIVERS_PATH)
      .send({
        ...correctTestDriverData,
        name: "   ",
        phoneNumber: "    ",
        email: "invalid email",
        vehicleMake: "",
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(4);

    const invalidDataSet2 = await request(app)
      .post(DRIVERS_PATH)
      .send({
        ...correctTestDriverData,
        phoneNumber: "", // empty string
        vehicleModel: "", // empty string
        vehicleYear: "year", // incorrect number
        vehicleLicensePlate: "", // empty string
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(4);

    const invalidDataSet3 = await request(app)
      .post(DRIVERS_PATH)
      .send({
        ...correctTestDriverData,
        name: "A", // too shot
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(1);

    // check что никто не создался
    const driverListResponse = await request(app).get(DRIVERS_PATH);
    expect(driverListResponse.body).toHaveLength(0);
  });
});
