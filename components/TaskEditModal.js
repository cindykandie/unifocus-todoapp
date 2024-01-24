// TaskEditModal.js

import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text } from 'react-native';

const TaskEditModal = ({ visible, onClose, onEdit, onDelete, task }) => {
    const [editedTask, setEditedTask] = useState('');

    useEffect(() => {
        // Update the local state when the task prop changes
        if (task) {
            setEditedTask(task.task);
        }
    }, [task]);

    const handleEdit = () => {
        if (task && editedTask.trim() !== '') {
            onEdit({ ...task, task: editedTask });
            setEditedTask('');
            onClose();
        }
    };

    const handleDelete = () => {
        if (task) {
            onDelete(task.id);
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View className="flex-1 justify-center items-center bg-purple-200  p-4 border-solid border-8 border-yellow-200">
                <Text className="p-2 mb-4 w-full text-md text-center">Edit or Delete here!🤠</Text>
                <TextInput
                    placeholder="Edit Task"
                    value={editedTask}
                    onChangeText={(text) => setEditedTask(text)}
                    className="border-solid border-[1px] border-purple-800 bg-white p-2 mb-4 w-full text-xl rounded"
                />
                <View className='flex-row items-center justify-between gap-6 my-5'>
                    <TouchableOpacity onPress={handleEdit} className="bg-yellow-500 p-3 rounded-lg">
                        <Text className="text-white text-xl text-center">Edit Task</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete} className="bg-red-500 p-3 rounded-lg">
                        <Text className="text-white text-xl text-center">Delete Task</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={onClose} className="mt-4">
                    <Text className="bg-purple-400 p-3 rounded-lg text-xl text-center w-24">Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default TaskEditModal;
