import {observer} from "mobx-react";
import type {NotificationArgsProps} from 'antd';
import {Button, Flex, Input, notification, Space} from 'antd';
import {isOnlyDigits, randomTypes} from "./constants.ts";
import {numbersStore} from "../store/NumbersStore.ts";
import React, {useState} from "react";

type NotificationPlacement = NotificationArgsProps['placement'];
const Context = React.createContext({name: 'Default'});

const {TextArea} = Input;

const Numbers = observer(() => {
    const [showError, setShowError] = useState(false)
    const [api, contextHolder] = notification.useNotification();

    const handleClick = (value: string) => {
        numbersStore.setSelectedRandomType(value)
        numbersStore.getRandomNumber()

        if (showError) {
            setShowError(false)
        }
    }

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === '') {
            numbersStore.setRandomNumber('')
            numbersStore.setNumberInfo('')
            return
        } else if (isNaN(+event.target.value) || !isOnlyDigits(event.target.value)) {
            setShowError(true)
            openNotification('topRight')
            numbersStore.setRandomNumber(event.target.value)
            numbersStore.setNumberInfo('')
            return
        }

        if (showError) {
            setShowError(false)
        }

        numbersStore.setRandomNumber(event.target.value)
        await numbersStore.getRandomNumber(event.target.value)
    }
    const openNotification = (placement: NotificationPlacement) => {
        api.error({
            message: `Notification`,
            description: <Context.Consumer>{({name}) => name}</Context.Consumer>,
            placement,
        });
    };

    return (
        <Context.Provider value={numbersStore.contextValue}>
            {contextHolder}
            <Flex
                gap="small"
                align="center"
                justify="center"
                style={{height: '100%', padding: '10px'}}
                vertical={false}
                className="numbers-wrap"
            >
                <Space size='middle' direction='vertical' style={{width: '400px'}}>
                    <Input status={showError ? "error" : ""} onChange={onChange} value={numbersStore.randomNumber}/>
                    <TextArea value={numbersStore.numberInfo} autoSize={{minRows: 6}}/>
                </Space>
                <Space className='types-wrap' size='middle' direction='vertical'>
                    {randomTypes.map(item => {
                        return (
                            <Button type={numbersStore.selectedRandomType === item.value ? 'primary' : 'dashed'}
                                    onClick={() => {
                                        handleClick(item.value)
                                    }}>
                                {item.title}
                            </Button>
                        )
                    })}
                </Space>

            </Flex>
        </Context.Provider>
    );
})

export default Numbers;