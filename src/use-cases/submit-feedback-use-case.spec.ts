import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: 'I have a problem',
            screenshot: 'data:image/png;base64/problem.png',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without a type', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: '',
            comment: 'I have a problem',
            screenshot: 'data:image/png;base64/problem.png',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without a comment', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64/problem.png',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid format', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: 'I have a problem',
            screenshot: 'problem.png',
        })).rejects.toThrow();
    });
})