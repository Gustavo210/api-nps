import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositorys/SurveysUsersRepository";

export class AnswerController {
  async execute(req: Request, res: Response) {
    const { u } = req.query;
    const { value } = req.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({ id: String(u) });

    if (!surveyUser) {
      throw new AppError("Survey User does not exists!");
    }
    surveyUser.value = Number(value);
    await surveysUsersRepository.save(surveyUser);

    return res.status(200).json(surveyUser);
  }
}
