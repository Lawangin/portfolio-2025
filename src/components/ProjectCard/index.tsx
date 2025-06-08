import { IoLogoGithub, IoLogoJavascript, IoIosGlobe } from "react-icons/io";

export const ProjectCard = () => {
    return (
        <div className="flex flex-col space-y-4 p-4">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#BA68C8] to-[#EE9645] flex items-center justify-center overflow-hidden">
                    <img src="/LawanginKhanLOGO-01.svg" alt="Project" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-xl font-semibold text-white p-2">Project Title</h2>
            </div>

            <p className="text-white/80 text-sm py-2">
                This is a detailed description of the project. It explains the technologies used,
                challenges overcome, and the overall purpose of the project. The description helps
                visitors understand what makes this project unique and interesting.
            </p>

            <hr className="border-t border-white/30" />

            <div className="flex justify-between pt-2">
                <div className="flex gap-2">
                    <IoLogoJavascript className="w-8 h-8 p-2 rounded-full bg-white/30 flex items-center justify-center text-xs text-white" />
                    <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-xs text-white">TS</div>
                    <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-xs text-white">RX</div>
                    <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-xs text-white">ND</div>
                </div>

                <div className="flex gap-2">
                    <IoLogoGithub className="w-8 h-8 p-1 rounded-full bg-[#EE9645]/60 flex items-center justify-center text-xs text-white" />
                    <IoIosGlobe className="w-8 h-8 p-1 rounded-full bg-[#BA68C8]/60 flex items-center justify-center text-xs text-white" />
                </div>
            </div>
        </div>
    )
}