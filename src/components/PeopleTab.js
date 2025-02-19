export default function PeopleTab() {
    return (
        <div className="w-2/3">
            <table className="table-auto ml-10 mr-10 w-full h-full">
                <thead>
                    <tr>
                        <th colSpan="3" className="text-left text-3xl">Teachers</th>
                    </tr>
                    <tr>
                        <td colSpan="4" className="p-0">
                        <div className="border-t border-gray-400"></div>
                        </td>
                    </tr>
                </thead>
                <tbody className="text-lg">
                    <tr>
                        <td className="px-6 py-2">
                            Picture
                        </td>
                        <td className="px-6 py-2">
                            First Name
                        </td>
                        <td className="px-6 py-2">
                            Last Name
                        </td>
                    </tr>
                </tbody>

                <thead>
                    <tr>
                        <th colSpan="3" className="text-left text-3xl">Classmates</th>
                        <td className="text-gray-600 px-6 py-2 text-right">?? People</td>
                    </tr>
                    <tr>
                        <td colSpan="4" className="p-0">
                            <div className="border-t border-gray-400"></div>
                        </td>
                    </tr>
                </thead>
                <tbody className="text-lg">
                    <tr>
                        <td className="px-6 py-2">
                        <svg className="w-8 h-8 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.4472 2.10557c-.2815-.14076-.6129-.14076-.8944 0L5.90482 4.92956l.37762.11119c.01131.00333.02257.00687.03376.0106L12 6.94594l5.6808-1.89361.3927-.13363-5.6263-2.81313ZM5 10V6.74803l.70053.20628L7 7.38747V10c0 .5523-.44772 1-1 1s-1-.4477-1-1Zm3-1c0-.42413.06601-.83285.18832-1.21643l3.49538 1.16514c.2053.06842.4272.06842.6325 0l3.4955-1.16514C15.934 8.16715 16 8.57587 16 9c0 2.2091-1.7909 4-4 4-2.20914 0-4-1.7909-4-4Z"/>
                            <path d="M14.2996 13.2767c.2332-.2289.5636-.3294.8847-.2692C17.379 13.4191 19 15.4884 19 17.6488v2.1525c0 1.2289-1.0315 2.1428-2.2 2.1428H7.2c-1.16849 0-2.2-.9139-2.2-2.1428v-2.1525c0-2.1409 1.59079-4.1893 3.75163-4.6288.32214-.0655.65589.0315.89274.2595l2.34883 2.2606 2.3064-2.2634Z"/>
                        </svg>

                        </td>
                        <td className="px-6 py-2">
                            First Name
                        </td>
                        <td className="px-6 py-2">
                            Last Name
                        </td>
                        <td className="px-6 py-2 text-right">
                            <a className="hover:bg-gray-200 py-2 px-2 rounded-full inline-flex items-center" href="mailto:recipient@example.com">
                            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
                                <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
                            </svg>

                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )   
}