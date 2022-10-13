import 'reflect-metadata';
import { UserController } from '../controller/users.controller';
import { UserService } from '../service/users.service';
import { mockClear, mock } from 'jest-mock-extended';
import { container } from '../../../core/inversify/inversify.config';
import { TYPES } from '../../../core/inversify/types';
import { CreateUserFixture } from '../fixtures/UserServiceFixture';
import { HttpException, ValidationException } from '../../../core/exception';

describe('Users Controller', () => {
	const UserServiceMock = mock<UserService>();
	let sut: UserController;
	sut = new UserController(UserServiceMock);
    

	beforeEach(() => {
		// container.unbindAll()
		// container.bind(TYPES.UserService).toConstantValue(UserServiceMock)
		// mockClear(UserServiceMock)
	});

	test('Users Controller should be defined', () => {
		expect(sut).toBeDefined();
	});

	test('should throw error while validation fails', async () => {
		const fixture = {
			body: {
				name: 'Jaga',
				user_name: 'jaga#1234'
			}
		};
		expect( sut.signup(fixture)).rejects.toThrowError(ValidationException);
	});
});