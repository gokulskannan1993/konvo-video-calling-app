import { React, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { completeVerfication } from '../lib/api.js'
import { CameraIcon, GlobeIcon, MapPinIcon, ShuffleIcon, LoaderCircle } from 'lucide-react'
import useAuthUser from '../hooks/useAuthUser.js'
import { LANGUAGES } from '../constants/constants.js'


const OnboardingPage = () => {
    const { authUser, isLoading } = useAuthUser();

    const queryClient = useQueryClient()

    const [formState, setFormState] = useState({
        name: authUser?.name || '',
        bio: authUser?.bio || '',
        country: authUser?.country || '',
        profilePicture: authUser?.profilePicture || '',
        nativeLanguage: authUser?.nativeLanguage || '',
        learningLanguage: authUser?.learningLanguage || '',
    });

    const { mutate: onboardingMutation, isPending } = useMutation({
        mutationFn: completeVerfication,
        onSuccess: () => {
            toast.success('Verification completed successfully!')
            queryClient.invalidateQueries('authUser')
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onboardingMutation(formState)
    }

    const handleRandomAvatar = () => {
        const randomAvatar = `https://api.dicebear.com/5.x/avataaars/svg?seed=${Math.floor(Math.random() * 10000)}`
        setFormState((prevState) => ({
            ...prevState,
            profilePicture: randomAvatar,
        }))
        toast.success('Random avatar generated!')
    }



    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100 p-4">
            <div className="w-full max-w-3xl p-6 bg-base-200 card shadow-xl">
                <div className="card-body p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete your profile</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Profile picture container */}
                        <div className="flex flex-col items-center justify-center space-y-4">
                            {/* Profile picture preview */}
                            <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                                {formState.profilePicture ? (
                                    <img
                                        src={formState.profilePicture}
                                        alt="Profile"
                                        className="w-full h-full  object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <CameraIcon className="size-12 text-base-content opacity-40" />
                                    </div>
                                )}



                            </div>
                            {/*Generate random avatar button */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleRandomAvatar}
                                    className="btn  btn-accent"
                                >
                                    <ShuffleIcon className="size-4 mr-2" />
                                    Generate New Avatar
                                </button>

                            </div>

                            {/* Full name input */}
                            <div className="form-control w-full">
                                <label className="label" htmlFor="name">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            {/* Bio input */}
                            <div className="form-control w-full">
                                <label className="label" htmlFor="bio">
                                    <span className="label-text">Bio</span>
                                </label>
                                <textarea
                                    id="bio"
                                    value={formState.bio}
                                    onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Tell us about yourself..."
                                    required

                                ></textarea>
                            </div>



                            {/* LANGUAGES */}
                            <div className="grid grid-cols-3 md:grid-cols-2 gap-4 w-full">

                                {/* Native language input */}
                                <div className="form-control ">
                                    <label className="label" htmlFor="nativeLanguage">
                                        <span className="label-text">Native Language</span>
                                    </label>
                                    <select
                                        name="nativeLanguage"
                                        id="nativeLanguage"
                                        value={formState.nativeLanguage}
                                        onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                                        className="select select-bordered w-full">
                                        <option value="" disabled>Select your native language</option>
                                        {LANGUAGES.map((language) => (
                                            <option key={`native-${language}`} value={language.toLowerCase()}>
                                                {language}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                {/* Learning language input */}
                                <div className="form-control">
                                    <label className="label" htmlFor="learningLanguage">
                                        <span className="label-text">Learning Language</span>
                                    </label>
                                    <select
                                        name="learningLanguage"
                                        id="learningLanguage"
                                        value={formState.learningLanguage}
                                        onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                                        className="select select-bordered w-full">
                                        <option value="" disabled>Select the language you are learning</option>
                                        {LANGUAGES.map((language) => (
                                            <option key={`learning-${language}`} value={language.toLowerCase()}>
                                                {language}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Location input */}
                            <div className="form-control w-full">
                                <label className="label" htmlFor="location">
                                    <span className="label-text">Location</span>
                                </label>
                                <div className="relative">
                                    <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-40" />
                                    <input
                                        type="text"
                                        id="location"
                                        value={formState.country}
                                        onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                                        className="input input-bordered w-full pl-10"
                                        placeholder="City, Country"
                                        required
                                    />
                                </div>
                            </div>


                            {/* Submit button */}
                            <div className="form-control w-full">
                                <button
                                    type="submit"
                                    className={`btn btn-primary ${isPending ? 'loading' : ''}`}
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <>
                                            <LoaderCircle className='animate-spin text-primary size-5 mr-2' />
                                            Loading...

                                        </>


                                    ) : (

                                        <>
                                            <GlobeIcon className="size-4 mr-2" />
                                            Complete Verification

                                        </>
                                    )}
                                </button>
                            </div>




                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default OnboardingPage