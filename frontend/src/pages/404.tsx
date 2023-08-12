import {Link} from "react-router-dom";

export default function NotFoundPage() {
    return (
        <section>
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="w-full lg:w-1/2">
                    <p className="text-sm font-medium text-primary">404 error</p>
                    <h1 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                        Page not found
                    </h1>
                    <p className="mt-4 text-gray-400">
                        Sorry, the page you are looking for doesn't exist. Here are some helpful links:
                    </p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <Link to="/" className="btn btn-primary">Take me home</Link>
                    </div>
                </div>

                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <img className="w-full max-w-lg lg:mx-auto"
                         src="https://merakiui.com/images/components/illustration.svg" alt=""/>
                </div>
            </div>
        </section>
    );
}