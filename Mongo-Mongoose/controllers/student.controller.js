const Student = require("../models/student.model");
const StudentService = require("../services/student.service");

class StudentController {
    static async getAllStudents(req, res) {
        try {
            const students = await StudentService.getAllStudents();
            res.status(200).send(students);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    static async getStudentById(req, res) {
        try {
            const studentId = req.params.id;
            const student = await StudentService.getStudentById(studentId);

            if (!student)
                return res
                    .status(404)
                    .send({ msg: `student with id: ${studentId} not found` });

            res.status(200).send(student);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    static async createStudent(req, res) {
        try {
            const studentData = req.body;

            const student = await StudentService.createStudent(studentData);
            console.log(student);
            res.status(201).send(student);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    static async updateStudent(req, res) {
        try {
            const updates = req.body;
            const studentId = req.params.id;

            const updatedStudent = await StudentService.updateStudent(
                studentId,
                updates
            );
            res.status(200).send(updatedStudent);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    static async deleteStudent(req, res) {
        try {
            const studentId = req.params.id;
            const response = await StudentService.deleteStudent(studentId);

            if (!response)
                return res
                    .status(404)
                    .send({ msg: `student with id ${studentId} deleted` });
            res.status(200).send(response);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

}

module.exports = StudentController;