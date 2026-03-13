import { Link } from "react-router"
import { SECTIONS } from "~/constants/schema"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto py-20 text-center">

      <h1 className="text-4xl font-bold mb-6">
        Dataset Metadata Builder
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        This tool allows researchers to create dataset metadata
        compatible with the HDR UK Gateway schema.
      </p>

      <Link
        to="/summary"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Start Dataset
      </Link>
    </div>
  )
}