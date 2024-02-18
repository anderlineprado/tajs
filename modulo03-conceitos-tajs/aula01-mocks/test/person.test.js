import { describe, it, expect, jest } from '@jest/globals'
import Person from './../src/person.js'

describe('#Person Suite', () => {
    describe('#validate', () => {
        it('should throw if the name is not present', () => {
            const mockInvalidPerson = { 
                name: '',
                cpf: "555.555.555-55" 
            }
            
            expect(() => Person.validate(mockInvalidPerson))
                .toThrow('name is required')
        })

        it('should throw if the cpf is not present', () => {
            const mockInvalidPerson = { 
                name: 'Clebinho Gomes',
                cpf: "" 
            }
            
            expect(() => Person.validate(mockInvalidPerson))
                .toThrow('cpf is required')
        })

        it('should not throw if person is valid', () => {
            const mockInvalidPerson = { 
                name: 'Clebinho Gomes',
                cpf: "555.555.555-55" 
            }
            
            expect(() => Person.validate(mockInvalidPerson))
                .not
                .toThrow()
        })
    })

    describe('#format', () => {
        it('should format the person name and cpf', () => {
            const mockPerson = {
                name: 'Clebinho Gomes',
                cpf: '555.555.555-55'
            }

            const formattedPerson = Person.format(mockPerson)

            const expected = {
                name: 'Clebinho',
                cpf: '55555555555',
                lastName: 'Gomes'
            }

            expect(formattedPerson).toStrictEqual(expected)
        })
    })

    describe('#save', () => {
        it('should not save an invalid person', () => {
            const mockPerson = {
                name: 'Clebinho',
                lastName: '',
                cpf: '55555555555'
            }

            expect(() => Person.save(mockPerson))
                .toThrow(`cannot save invalid person: ${JSON.stringify(mockPerson)}`)
        })

        it('should save a valid person', () => {
            const mockPerson = {
                name: 'Clebinho',
                lastName: 'Gomes',
                cpf: '55555555555'
            }

            const savedPerson = Person.save(mockPerson)
            const expected = `registrado com sucesso ${mockPerson}`

            expect(savedPerson)
                .toStrictEqual(expected)
        })
    })

    describe('#process', () => {
        it('should process a valid person', () => {
            const mockPerson = {
                name: 'Clebinho Gomes',
                cpf: '555.555.555-55'
            }
            const expected = 'ok'

            jest
                .spyOn(
                    Person,
                    Person.validate.name
                )
                .mockReturnValue()

            jest
                .spyOn(
                    Person,
                    Person.format.name
                ).mockReturnValue({
                    cpf: '55555555555',
                    name: 'Clebinho',
                    lastName: 'Gomes'
                })

            const result = Person.process(mockPerson)

            expect(result).toStrictEqual(expected)
        })
    })
})