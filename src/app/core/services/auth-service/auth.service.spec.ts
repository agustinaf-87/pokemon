import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { Data } from "@angular/router";

describe("AuthService", () => {
  let httpMock: HttpTestingController;
  let service: AuthService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return a token", () => {
    const dummymockToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InVzZXIiLCJyb2xlIjoiRGV2ZWxvcGVyIiwibmJmIjoxNjgzMjExNzg3LCJleHAiOjE2ODMyMTM1ODcsImlhdCI6MTY4MzIxMTc4NywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0OTIyMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDkyMjAifQ.pueZxYDlrYc-gR9jfHs77dxQ22LKhpML4CRspS17tLE";

    service.login("user", "123456").subscribe((token) => {
      expect(token).toEqual(dummymockToken);
    });
    const req = httpMock.expectOne("/api/login/authenticate");
    expect(req.request.method).toBe("POST");
    req.flush(dummymockToken);
  });

  it("should return a token 401 error", () => {
    const emsg = "401 error";
    httpClient.get<Data[]>("/api/login/authenticate").subscribe({
      next: () => fail("should have failed with the 401 error"),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext("status").toEqual(401);
        expect(error.error).withContext("message").toEqual(emsg);
      },
    });
    const req = httpMock.expectOne("/api/login/authenticate");
    req.flush(emsg, { status: 401, statusText: "Unauthorized" });
  });

  it("can test for network error", (done) => {
    const mockError = new ProgressEvent("error");

    httpClient.get<Data[]>("/api/login/authenticate").subscribe({
      next: () => fail("should have failed with the network error"),
      error: (error: HttpErrorResponse) => {
        expect(error.error).toBe(mockError);
        done();
      },
    });

    const req = httpMock.expectOne("/api/login/authenticate");

    req.error(mockError);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
