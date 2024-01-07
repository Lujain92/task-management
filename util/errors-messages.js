const errorMessages = {
    serverError: {
        status: 500,
        message:
            'Some error occurred! We are working on fixing this,\nsorry for the inconvenience!',
    },
    duplicateKey: {
        status: 409,
        message: `Task name must be unique.\n The task name is already in use`,
    },
};

export default errorMessages;
