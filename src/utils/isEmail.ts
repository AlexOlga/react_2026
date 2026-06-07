const isEmail = (email: string) => {
        const parts = email.split('@');

        if (parts.length !== 2) return false;

        const [local, domain] = parts;

        if (!local) return false;
        if (!domain) return false;
        if (!domain.includes('.')) return false;
        const dotIndex = domain.lastIndexOf('.');
        if (dotIndex === -1) return false;

        const domainName = domain.slice(0, dotIndex);
        const tld = domain.slice(dotIndex + 1);
        if (!domainName) return false;
        if (tld.length < 2) return false;

        return true;
      }
export default isEmail;