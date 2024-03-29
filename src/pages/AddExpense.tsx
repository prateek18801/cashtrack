import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import useLocalStorage from '../hooks/useLocalStorage';

type formDataType = {
    id: string,
    title: string,
    amount: string,
    category: string,
    date: string,
    notes: string
}

const uuid = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const AddExpense: React.FC = () => {

    const [expenses, setExpenses] = useLocalStorage('EXPENSES', []);

    const [formData, setFormData] = useState<formDataType>({
        id: uuid(),
        title: '',
        amount: '',
        category: 'food',
        date: new Date().toISOString().substring(0, 10),
        notes: ''
    });

    const handleSubmit = () => {
        // TODO - Indicate required fields
        if (!(formData.title && formData.amount)) return;

        setExpenses(prev => [formData, ...prev]);
        setFormData({
            id: uuid(),
            title: '',
            amount: '',
            category: 'food',
            date: new Date().toISOString().substring(0, 10),
            notes: ''
        });
    }

    return (
        <div className='m-3'>
            <h3 className='mb-4'>Add Expense</h3>
            <ExpenseForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default AddExpense;
