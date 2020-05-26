import * as litUnsafeHTML from 'lit-html/lib/unsafe-html.js';
import sinon from 'sinon';
import FullCertificate from '../../../../src/components/organisms/FullCertificate/FullCertificate';
import { assertStringInValues } from '../helpers/assertStringValues';

describe('FullCertificate component test suite', function () {
  describe('given there is no certificate definition', function () {
    it('should return null', function () {
      const instance = FullCertificate({ hasCertificateDefinition: false });
      expect(instance).toBeNull();
    });
  });

  describe('given the certificate has a displayHTML property', function () {
    beforeEach(function () {
      // call through unsafeHTML directive
      sinon.stub(litUnsafeHTML, 'unsafeHTML').callsFake(str => str);
    });

    afterEach(function () {
      sinon.restore();
    });

    it('should render the displayHTML property', function () {
      const fixtureDisplayHTML = '<div>This is a test</div>';
      const instance = FullCertificate({ displayHTML: fixtureDisplayHTML, hasCertificateDefinition: true });
      expect(assertStringInValues(instance, fixtureDisplayHTML)).toBe(true);
    });

    describe('and the displayHTML property contains a URL', function () {
      describe('and the clickableUrls flag is set to true', function () {
        it('should transform it to a clickable link', function () {
          const fixtureDisplayHTML = '<div>This is a test, click on www.blockcerts.org</div>';
          const instance = FullCertificate({ displayHTML: fixtureDisplayHTML, hasCertificateDefinition: true, clickableUrls: true });
          expect(assertStringInValues(instance, '<a href="http://www.blockcerts.org" target="_blank" rel="noopener noreferrer">www.blockcerts.org</a>')).toBe(true);
        });
      });

      describe('and the clickableUrls flag is set to false', function () {
        it('should not transform it to a clickable link', function () {
          const fixtureDisplayHTML = '<div>This is a test, click on www.blockcerts.org</div>';
          const instance = FullCertificate({ displayHTML: fixtureDisplayHTML, hasCertificateDefinition: true, clickableUrls: false });
          expect(assertStringInValues(instance, '<a href="http://www.blockcerts.org" target="_blank" rel="noopener noreferrer">www.blockcerts.org</a>')).toBe(false);
        });
      });
    });
  });

  describe('given the certificate does not have a displayHTML property', function () {
    it('should render the certificate as v1', function () {
      const instance = FullCertificate({ hasCertificateDefinition: true });
      const instanceAsString = JSON.stringify(instance);
      expect(instanceAsString).toContain('buv-full-certificate-v1');
    });
  });
});