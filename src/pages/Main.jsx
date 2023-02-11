import {
    AppHeader,
    AddNotes,
    RenderNotes,
    SearchNotes,
    ModalRegistrationInfo
} from '../components/index';

export const Main = () => {
    return (
        <div className='app'>
            <AppHeader />
            <main>
                <AddNotes />
                <RenderNotes />
                <SearchNotes />
            </main>
            <ModalRegistrationInfo />
        </div>
    );
};
