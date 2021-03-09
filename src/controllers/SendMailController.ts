import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from "path";
import { SurveysRepository } from "../repositorys/SurveysRepository";
import { SurveysUsersRepository } from "../repositorys/SurveysUsersRepository";
import { UsersRepository } from "../repositorys/UsersRepositorys";
import SendMailService from "../services/SendMailService";
import { AppError } from "../errors/AppError";

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = await getCustomRepository(UsersRepository);
    const surveysRepository = await getCustomRepository(SurveysRepository);
    const surveysUsersRepository = await getCustomRepository(
      SurveysUsersRepository
    );

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError("User does not exists");
    }

    const survey = await surveysRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      throw new AppError("Survey does not exists");
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: {
        user_id: user.id,
        value: null,
      },

      relations: ["user", "survey"],
    });

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      SendMailService.execute(email, survey.title, variables, npsPath);
      return res.status(201).json(surveyUserAlreadyExists);
    }
    const surveyUser = await surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    variables.id = surveyUser.id;
    await surveysUsersRepository.save(surveyUser);
    SendMailService.execute(email, survey.title, variables, npsPath);

    return res.status(201).json(surveyUser);
  }
}

export { SendMailController };
