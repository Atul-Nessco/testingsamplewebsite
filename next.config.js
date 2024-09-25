// next.config.js
module.exports = {
    async headers() {
      return [
        {
          source: '/(.*)', // Apply the header to all routes
          headers: [
            {
              key: 'X-Robots-Tag',
              value: 'index, follow', // Ensure indexing is allowed
            },
          ],
        },
      ];
    },
  };
  