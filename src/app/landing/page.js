import Link from 'next/link';
import GoogleIcon from '@/components/landing-page/GoogleIcon';

const AVATARS = [
  {
    alt: 'User',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAq7eN2JReOakWSy7OSUCPcaXdQqj1qw6LWq7Su96YqWZeqQWpDy_TI23VkzjwrQYWRjFun3vdTxHOQQAKDYzf1hzpzvqsKo1M7jptuZx3xdNm4bWhfCr-WQJ4u5BwXBJed8s5ccLah6ShiVztyZZwYvY6d2SwdDIT3PCaYSwkBsM8g7FhesAoMeK2KOHVHhaiqLsG2pCdpuGnxKjkvR_o8c-jaje9Bp-YvOWDFHThOw1sBlhJ4YWAcMcOkbhE1JR8ohXSN02YLm8',
  },
  {
    alt: 'User',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4qG-RlKA5UzNzkBodYaBLN-NMZkjQfg4wxH4YUQ8Cmj_0-uvZgGKD0FkbBqWTZaVp3piT2CvMDgPUz_2kqsBDXPC5HquYJTPVQH8xTOhgTPHx2--cKpNDpidvAb0Re-AhaMqxYL9G16cvkzmGpC_qcE7VcX7uHktJb-HqLl3hrL3ngbqjZOLKYu2-KDrxAxUvOvOTsQjYQ2mjefXKChHJJgFwahSq8Jk88jfhdZG40be9XIV6_g9jRykTwwqNMt_6ZE-ijMe8q5k',
  },
  {
    alt: 'User',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Wo7DekLI7SZCrt2hZHN_6Uy-OVDyJlSB4ErNkyNNTMmgxYENSrhHx4Nlf8lwzW1f_zVtPrIfI5HdsIEtUDXj-Hg_urD7kRmGSkBVcsabEQOduS9b3ngXAeLbonC2wXGasnFxZbfjeep7n-3VCgTi2Dp6gx-9m9KlbOn4t8HgO4ceEBGkv7sBalZHnH5W1KkUVM82OJRe1irwGkgnauS2OI5EFHCysqFIb9qCg25quniBQyvjV3iGx1Tc6q4KWZdOCjvH4DJOS6I',
  },
];

export default function MarketingLandingPage() {
  return (
  <>
    <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-surface px-lg py-sm shadow-sm">
      <div className="text-headline-md font-bold text-primary">TaskFlow</div>
      <div className="flex items-center gap-md">
        <Link
          href="#signin"
          className="text-label-md font-medium text-on-surface-variant transition-colors hover:text-primary"
        >
          Sign In
        </Link>
        <Link
          href="#signup"
          className="rounded-lg bg-primary px-md py-xs text-label-md font-medium text-on-primary transition-opacity hover:opacity-90"
        >
          Get Started
        </Link>
      </div>
    </header>

    <main className="flex flex-col items-center">
      <section className="grid min-h-[716px] w-full max-w-container-max grid-cols-1 items-center gap-xl px-lg py-xl lg:grid-cols-2">
        <div className="flex flex-col gap-md">
          <div className="inline-flex w-fit items-center gap-xs rounded-full bg-primary-container/10 px-sm py-1 text-primary">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span className="text-label-sm font-semibold uppercase tracking-wider">
              Productivity Redefined
            </span>
          </div>
          <h1 className="text-display-lg font-bold text-on-surface">
            Manage complex workflows with{' '}
            <span className="text-primary">absolute clarity.</span>
          </h1>
          <p className="max-w-lg text-body-lg text-on-surface-variant">
            TaskFlow is engineered for high-performance teams. Recede the noise and let your
            tasks take center stage with our utility-first dashboard.
          </p>
          <div className="mt-sm flex flex-wrap gap-md">
            <Link
              href="#signup"
              className="rounded-lg bg-primary px-lg py-md text-label-md font-medium text-on-primary shadow-md transition-transform hover:-translate-y-px"
            >
              Start Free Trial
            </Link>
            <button
              type="button"
              className="rounded-lg border border-outline-variant bg-surface px-lg py-md text-label-md font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low"
            >
              Book a Demo
            </button>
          </div>
          <div className="mt-md flex items-center gap-sm">
            <div className="flex -space-x-2">
              {AVATARS.map((avatar) => (
                <img
                  key={avatar.src}
                  alt={avatar.alt}
                  src={avatar.src}
                  className="h-8 w-8 rounded-full border-2 border-surface"
                />
              ))}
            </div>
            <p className="text-label-sm text-on-surface-variant">
              Trusted by 2,000+ high-growth teams
            </p>
          </div>
        </div>

        <div className="relative grid h-[500px] grid-cols-6 grid-rows-6 gap-sm">
          <div className="col-span-4 row-span-4 flex flex-col gap-sm overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container p-md shadow-sm">
            <div className="h-2 w-full overflow-hidden rounded-full bg-primary-container/20">
              <div className="h-full w-2/3 bg-primary" />
            </div>
            <div className="flex items-center gap-sm border-b border-outline-variant/20 pb-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <div>
                <div className="text-label-md font-medium">Q3 Deliverables</div>
                <div className="text-[10px] uppercase text-on-surface-variant">Project Alpha</div>
              </div>
            </div>
            <div className="flex flex-col gap-xs">
              <div className="flex items-center justify-between rounded border border-outline-variant/10 bg-surface p-xs">
                <span className="text-[12px]">Database Migration</span>
                <span className="rounded bg-emerald-100 px-xs py-[2px] text-[10px] font-bold text-emerald-700">
                  DONE
                </span>
              </div>
              <div className="flex items-center justify-between rounded border border-outline-variant/10 bg-surface p-xs">
                <span className="text-[12px]">UI Refactor</span>
                <span className="rounded bg-primary-container/20 px-xs py-[2px] text-[10px] font-bold text-primary">
                  IN PROGRESS
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-2 col-start-5 row-span-2 flex items-center justify-center rounded-xl bg-primary text-on-primary">
            <span className="material-symbols-outlined text-[48px]">rocket_launch</span>
          </div>
          <div className="col-span-2 col-start-5 row-span-4 row-start-3 overflow-hidden rounded-xl bg-surface-container-highest p-md">
            <div className="text-headline-sm font-semibold text-primary">94%</div>
            <div className="text-label-sm text-on-surface-variant">Efficiency Gain</div>
            <div className="mt-md space-y-2">
              <div className="h-1 w-full rounded bg-white" />
              <div className="h-1 w-3/4 rounded bg-white" />
              <div className="h-1 w-1/2 rounded bg-white" />
            </div>
          </div>
          <div className="col-span-4 row-span-2 row-start-5 flex items-center gap-md rounded-xl bg-inverse-surface p-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-low">
              <span className="material-symbols-outlined text-primary">security</span>
            </div>
            <div>
              <div className="text-label-md text-surface">Enterprise Security</div>
              <div className="text-[12px] text-outline-variant">
                End-to-end encryption by default
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center gap-xl border-t border-outline-variant/10 bg-surface-container-low py-xl">
        <div className="w-full max-w-[450px] px-lg" id="signin">
          <div className="auth-card flex flex-col gap-md rounded-xl border border-outline-variant/20 bg-surface p-xl">
            <div className="flex flex-col gap-xs text-center">
              <h2 className="text-headline-md font-semibold text-on-surface">Sign in to TaskFlow</h2>
              <p className="text-body-sm text-on-surface-variant">
                Welcome back! Please enter your details.
              </p>
            </div>
            <div className="flex flex-col gap-sm">
              <Link
                href="/sign-in"
                className="flex w-full items-center justify-center gap-sm rounded-lg border border-outline-variant py-sm text-label-md font-medium text-on-surface transition-colors hover:bg-surface-container-low"
              >
                <GoogleIcon />
                Continue with Google
              </Link>
              <div className="flex items-center gap-sm py-xs">
                <div className="h-px flex-1 bg-outline-variant/30" />
                <span className="text-label-sm uppercase tracking-widest text-outline">or</span>
                <div className="h-px flex-1 bg-outline-variant/30" />
              </div>
            </div>
            <form className="flex flex-col gap-md" action="/sign-in" method="get">
              <div className="flex flex-col gap-xs">
                <label className="text-label-md text-on-surface-variant" htmlFor="signin-email">
                  Email Address
                </label>
                <input
                  id="signin-email"
                  type="email"
                  placeholder="name@company.com"
                />
              </div>
              <div className="flex flex-col gap-xs">
                <div className="flex items-center justify-between">
                  <label className="text-label-md text-on-surface-variant" htmlFor="signin-password">
                    Password
                  </label>
                  <Link href="/sign-in" className="text-[12px] text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="signin-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="mt-sm w-full rounded-lg bg-primary py-sm text-label-md font-medium text-on-primary shadow-sm transition-opacity hover:opacity-90"
              >
                Sign In
              </button>
            </form>
            <p className="text-center text-body-sm text-on-surface-variant">
              No account?{' '}
              <Link href="#signup" className="font-semibold text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <div className="w-full max-w-[450px] px-lg" id="signup">
          <div className="auth-card flex flex-col gap-md rounded-xl border border-outline-variant/20 bg-surface p-xl">
            <div className="flex flex-col gap-xs text-center">
              <h2 className="text-headline-md font-semibold text-on-surface">Create your account</h2>
              <p className="text-body-sm text-on-surface-variant">
                Start your 14-day free trial today.
              </p>
            </div>
            <form className="flex flex-col gap-md" action="/sign-up" method="get">
              <div className="grid grid-cols-2 gap-sm">
                <div className="flex flex-col gap-xs">
                  <label className="text-label-md text-on-surface-variant" htmlFor="signup-first">
                    First name
                  </label>
                  <input id="signup-first" type="text" placeholder="Jane" />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="text-label-md text-on-surface-variant" htmlFor="signup-last">
                    Last name
                  </label>
                  <input id="signup-last" type="text" placeholder="Doe" />
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-label-md text-on-surface-variant" htmlFor="signup-email">
                  Email Address
                </label>
                <input id="signup-email" type="email" placeholder="name@company.com" />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-label-md text-on-surface-variant" htmlFor="signup-password">
                  Password
                </label>
                <input id="signup-password" type="password" placeholder="••••••••" />
                <p className="text-[11px] text-outline">Must be at least 8 characters long.</p>
              </div>
              <div className="mt-xs flex items-start gap-sm">
                <input
                  id="signup-terms"
                  type="checkbox"
                  className="mt-1 rounded text-primary focus:ring-primary"
                />
                <label
                  htmlFor="signup-terms"
                  className="text-body-sm leading-tight text-on-surface-variant"
                >
                  I agree to the{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              <button
                type="submit"
                className="mt-sm w-full rounded-lg bg-primary py-sm text-label-md font-medium text-on-primary shadow-sm transition-opacity hover:opacity-90"
              >
                Create Account
              </button>
            </form>
            <div className="flex items-center gap-sm py-xs">
              <div className="h-px flex-1 bg-outline-variant/30" />
              <span className="text-label-sm uppercase tracking-widest text-outline">or</span>
              <div className="h-px flex-1 bg-outline-variant/30" />
            </div>
            <Link
              href="/sign-up"
              className="flex w-full items-center justify-center gap-sm rounded-lg border border-outline-variant py-sm text-label-md font-medium text-on-surface transition-colors hover:bg-surface-container-low"
            >
              <GoogleIcon />
              Sign up with Google
            </Link>
            <p className="text-center text-body-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link href="#signin" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-outline-variant/20 bg-surface px-lg py-xl">
        <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-md md:flex-row">
          <div className="flex flex-col gap-xs">
            <div className="text-headline-sm font-bold text-primary">TaskFlow</div>
            <p className="text-body-sm text-outline">
              © 2024 TaskFlow Productivity Inc. All rights reserved.
            </p>
          </div>
          <div className="flex gap-lg">
            {['Privacy', 'Terms', 'Security', 'Status'].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-label-md text-on-surface-variant transition-colors hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  </>
  );
}
