import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

const PersonalInfo = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        socials: [''],
    });

    const handleAddSocial = () => {
        setForm({ ...form, socials: [...form.socials, ''] });
    };

    const handleChangeSocial = (index: number, value: string) => {
        const updated = [...form.socials];
        updated[index] = value;
        setForm({ ...form, socials: updated });
    };

    const handleRemoveSocial = (index: number) => {
        const updated = form.socials.filter((_, i) => i !== index);
        setForm({ ...form, socials: updated });
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className="font-bold text-2xl mb-8">Personal Information</h1>
                <Button className="cursor-pointer" onClick={() => setStep(prev => prev + 10)}>Next</Button>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <Label htmlFor="fullName" className="mb-1 font-medium">Full Name</Label>
                    <Input id="fullName" type="text" />
                </div>

                <div className="flex flex-col">
                    <Label htmlFor="email" className="mb-1 font-medium">Email Address</Label>
                    <Input id="email" type="email" />
                </div>

                <div className="flex flex-col">
                    <Label htmlFor="phone" className="mb-1 font-medium">Phone Number</Label>
                    <Input id="phone" type="tel" />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <Label className="font-medium">Socials</Label>
                        <Button variant="link" className="p-0 ml-2 cursor-pointer" onClick={handleAddSocial}>
                            Add Socials
                        </Button>
                    </div>

                    {form.socials.map((social, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input
                                value={social}
                                onChange={(e) => handleChangeSocial(index, e.target.value)}
                            />
                            {form.socials.length > 1 && (
                                <Button variant="link" className='cursor-pointer' onClick={() => handleRemoveSocial(index)}>
                                    Remove
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col">
                    <Label htmlFor="address" className="mb-1 font-medium">Address</Label>
                    <textarea
                        id="address"
                        rows={5}
                        cols={30}
                        className="border border-gray-300 p-2 rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
