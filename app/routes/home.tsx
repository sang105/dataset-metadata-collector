import { Link } from "react-router"
import { SECTIONS } from "~/constants/schema"

export default function Home() {
  return (
    // <div className="max-w-3xl mx-auto py-20 text-center">
    <div>
      <h1 className="text-4xl font-bold m-6 text-center text-[#020812]">
        Dataset Metadata Builder
      </h1>

      <p className="text-lg text-gray-700 mb-10 text-center">
        This tool <span className="text-blue-600 font-sans font-bold">allows researchers to create dataset metadata and download as JSON</span> format <br></br>
        compatible with the HDR UK Gateway platform.
      </p>

       {/* border-[#020812]/90 bg-[#020812]/90 */}
      <div className="flex mb-20 border w-full items-center xl:h-170 lg:h-260 sm:h-320  border-[#ECECEC] bg-[#ECECEC]">
        <div className="text-justify w-9/12 h-9/12 border bg-white border-white m-auto rounded-2xl ">
          <h3 className="p-4 my-2 mx-4 font-semibold text-lg text-[#020812]">
            Please note the following before filling the metadata collector form
          </h3>
          <ul className="p-4 mx-4 list-none text-gray-700 text-lg">
            <li>
              Each section of the metadata collector form has a progress map.
            </li>
            <li>
              The progress map is tracked by the number of required fields filled per section.
            </li> 
            <li>
              Once all the required fields per section are filled the progress map will display a <span className="font-semibold text-green-600">100%</span>.
            </li>
            <li>
              There is also an overall progress map which displays the overall percentage of all sections already filled.
            </li>
            <li>
              As the name implies, the overall progress map computes overall percentage for all filled sections.
            </li>
            <li>
              There are special cases on a few sections of the form e.g. Structural metadata, Observation, Demographic frequency.
            </li>
            <li>
              These sections progress is tracked when user creates/add a dynamic input using the different options implemented.
            </li>
            <li>
              As users start to fill form a draft is saved on browser local storage, draft can always be retrieved even after closing browser tab.
            </li>
            <li>
              Users can <span className="font-semibold">only loss draft</span> on browser local storage by clicking <span className="border rounded-sm bg-[linear-gradient(135deg,#0EA5E9,#6366F1)] border-[linear-gradient(135deg,#0EA5E9,#6366F1)] text-sm font-sans py-1 px-1.5 text-white">Reset</span> button and confirm reset.
            </li>
            <li>
              Form is flexible enough allowing users to export as JSON even when progress per section or overall progress is &lt; 100%.
            </li>
            <li>
              <span className="font-semibold">However, we encourage all data custodians to provide as much information as possible about datasets</span>.
            </li>
            <li>
              Users can use the <span className="font-semibold border bg-[linear-gradient(135deg,#0EA5E9,#6366F1)] text-white border-[linear-gradient(135deg,#0EA5E9,#6366F1)] rounded-md px-1.5 py-1 font-sans text-sm">Export JSON</span> to export form, this downloads form information as JSON file on users local machine. 
            </li>
            <li>
              Downloaded file can be sent to Metadata Manager for dataset onboarding on the Gateway.
            </li>
          </ul>
        </div>
      </div>

      <div className="my-1.5 text-center">
        <Link
          to="/summary"
          className="bg-blue-600 text-2xl font-semibold text-white px-6 py-3 rounded-lg shadow-md shadow-blue-600/50"
        >
          Create Dataset
        </Link>
      </div>
    </div>
  )
}