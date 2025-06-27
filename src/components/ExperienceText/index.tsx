import SkillButton from "../SkillButton";

interface ISkills {
    name: string;
    color: string;
}

type ExperienceTextProps = {
    skills: ISkills[];
    date: string;
    position: string;
    company: string;
    description?: string;
};

const ExperienceText = ({ skills, date, position, company, description }: ExperienceTextProps) => {
    return (
        <>
            <p className='opacity-70'>{date}</p>
            <p className='text-lg font-medium' >{position}</p>
            <p className='text-lg font-medium' >{company}</p>
            {description && (
                <p className='text-sm font-normal opacity-70'>{description}</p>
            )}
            <div className="flex flex-wrap gap-1 mt-2 py-2">
                {skills.map((skill, index) => (
                    <SkillButton key={index} skill={skill} />
                ))}
            </div>
        </>
    );
}
export default ExperienceText;