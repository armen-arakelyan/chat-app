import FormInput from '../ChatInput';

const SetUserName = ({ onClick }: { onClick: (name: string) => void }) => (
        <FormInput buttonText="Join Chat" onSubmit={onClick} placeholder="Username" />
    )

export default SetUserName;
