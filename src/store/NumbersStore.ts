import {makeAutoObservable} from "mobx";
import {randomTypes} from "../components/constants.ts";
import axiosInstance from "../api/axiosInstance.ts";

class NumbersStore {
    constructor() {
        makeAutoObservable(this)
    }

    randomNumber: string = ''
    selectedRandomType: string = randomTypes[0].value
    numberInfo: string = ''
    notificationMessage: string = 'Число должно быть в виде цифры!'

    get contextValue() {
        return {name: this.notificationMessage}
    }

    setSelectedRandomType = (value: string) => {
        this.selectedRandomType = value
    }

    setRandomNumber = (value: string) => {
        this.randomNumber = value
    }

    setNumberInfo = (value: string) => {
        this.numberInfo = value
    }

    setNotificationMessage = (value: string) => {
        this.notificationMessage = value
    }

    getRandomNumber = async (input: string = 'random') => {
        try {
            const res = await axiosInstance.get(`${input}/${this.selectedRandomType}`)

            const index = res.data.indexOf('is')

            if (index > 0) {
                if (input === 'random') {
                    this.setRandomNumber(res.data.slice(0, index - 1))
                }
                this.setNumberInfo(res.data)
            } else {
                this.setNotificationMessage('Что то пошло не так')
            }
        } catch (e) {
            this.setNotificationMessage('Что то пошло не так')
        }
    }

}

export const numbersStore = new NumbersStore();